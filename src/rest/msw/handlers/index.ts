import { todoApis } from "./todo";
import { userApis } from "./user";

export const handlers = [...userApis, ...todoApis];
