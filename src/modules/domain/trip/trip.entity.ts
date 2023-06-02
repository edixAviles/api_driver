import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"
import {
    DataDeparture,
    DataArrival,
    DataTripStatus
} from "../../shared.domain/trip/trip.extra"

class Trip extends BaseBasicModel {
    @AutoMap()
    public departure: DataDeparture

    @AutoMap()
    public arrival: DataArrival

    @AutoMap()
    public tripStatus: DataTripStatus[]

    @AutoMap()
    public price: number

    @AutoMap()
    public availableSeats: number

    @AutoMap()
    public description: string

    @AutoMap()
    public vehicleId: ObjectId
}

export default Trip
