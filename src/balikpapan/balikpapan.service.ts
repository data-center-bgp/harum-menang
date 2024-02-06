import { PrismaService } from "../prisma.service";
import { balikpapan } from "@prisma/client";

export class BalikpapanService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBalikpapanData() {
    try {
      const response = await this.prismaService.balikpapan.findMany();
      if (response.length === 0) {
        return {
          code: 404,
          response: "Data not found!",
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

  async getBalikpapanDataByNIK(nik: string) {
    try {
      const response = await this.prismaService.balikpapan.findUnique({
        where: {
          nik: nik,
        },
      });
      if (response === null) {
        return {
          code: 404,
          response: "Data not found!",
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

  async getBalikpapanDataByNKK(nkk: string) {
    try {
      const response = await this.prismaService.balikpapan.findMany({
        where: {
          nkk: nkk,
        },
      });
      if (response === null) {
        return {
          code: 404,
          response: "Data not found!",
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
