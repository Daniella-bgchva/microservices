import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();
        const authHeader = req.headers['authorization'];

        if (!authHeader) throw new UnauthorizedException('No token provided');

        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) throw new UnauthorizedException('Invalid token');

        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            req['user'] = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Token expired or invalid');
        }
    }
}
