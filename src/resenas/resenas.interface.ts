export interface IResenasService {
  create(createResenaDto: any): any;
  findAll(): any;
  findOne(id: string): any;
  update(id: string, updateResenaDto: any): any;
  remove(id: string): any;
}
