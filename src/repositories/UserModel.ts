export interface UserModel {
  findOne(args: unknown): Promise<any>
  create(args: unknown): Promise<any>
  destroy(args: unknown): Promise<number>
}
