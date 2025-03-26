export interface Sensor {
  id: number;
  name: string;
  description: string;
  value: string;
  tinaco_id: number;
  sensor_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface SensorHistorial {
  _id: { $oid: string };
  tinaco_id: string;
  sensor_id: string;
  valor: string;
  created_at: string;
}

export interface SensorData {
  id: number;
  name: string;
  description: string;
  value: string;
}
export interface SensorResponseTemperatura {
  id: number;
  name: string;
  description: string;
  value: number;
}
export interface SensorResponsePH {
  id: number;
  name: string;
  description: string;
  value: number;
}
export interface SensorResponseTurbidez {
  id: number;
  name: string;
  description: string;
  value: number;
}
export interface SensorResponseTDS {
  id: number;
  name: string;
  description: string;
  value: number;
}
export interface SensorResponseUltrasonico {
  id: number;
  name: string;
  description: string;
  value: number;
}
