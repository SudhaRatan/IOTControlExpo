export interface User {
  name: string;
  email: string;
  _id: string;
}

export interface Thing {
  _id?: string;
  name: string;
  icon: string;
  switches?: Switch[];
}

export interface Switch {
  _id?: string;
  name: string;
  icon: string;
  switchId: string;
  thingId: string;
}