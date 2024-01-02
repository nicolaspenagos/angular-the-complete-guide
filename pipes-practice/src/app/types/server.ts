export interface Server {
  instanceType: string;
  name: string;
  status: string;
  started: Date;
}
export type ServerProp = 'instanceType' | 'name' | 'status' | 'started';
