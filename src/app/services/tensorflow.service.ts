import { Injectable } from "@angular/core";
import { AppConfig } from "../config/app-config";
import { HttpClient } from "@angular/common/http";
import { Vehicles } from "../models/vehicles.model";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TensorflowService {
  static URI = AppConfig.BASE_URL + "/tensorflow";

  constructor(private http: HttpClient) {}

  fetchData(video: File): Observable<Vehicles> {
    return this.http.post(TensorflowService.URI, { video: video }).pipe(
      first(),
      map((res: any) => res as Vehicles)
    );
  }
}
