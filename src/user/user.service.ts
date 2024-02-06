import { PrismaService } from "../prisma.service";

export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUser() {
    try {
      const response = await this.prismaService.user.findMany();
      if (response.length === 0) {
        return {
          code: 404,
          response: "User is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal Server Error!",
      };
    }
  }

  async getUserByEmail(email: string) {
    try {
      const response = await this.prismaService.user.findFirst({
        where: {
          email: email,
        },
      });
      if (response === null) {
        return {
          code: 404,
          response: "User is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal Server Error!",
      };
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
      if (response === null) {
        return {
          code: 404,
          response: "User is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal Server Error!",
      };
    }
  }
}
