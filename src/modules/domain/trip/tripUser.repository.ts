import { ObjectId } from "mongodb"

import {
    Repository,
    IRepository
} from "../../../core/domain/repository"
import TripUser from "./tripUser.entity"
import TripUserModel from "./tripUser.model"

class TripUserRepository extends Repository<TripUser> implements IRepository<TripUser> {
    async get(id: ObjectId): Promise<TripUser> {
        const document = await TripUserModel.findOne(this.filterToGet(id))

        const entity = new TripUser({ ...document })
        return document ? entity : null
    }

    async getTripsUserByState(tripId: ObjectId, state: string): Promise<TripUser[]> {
        const documents = await TripUserModel.find({
            tripId: tripId,
            tripState: {
                $elemMatch: {
                    state: state,
                    isCurrent: true
                }
            }
        })

        const entities = new Array<TripUser>()
        documents.forEach(document => {
            entities.push(new TripUser({ ...document }))
        })

        return entities
    }

    async insert(entity: TripUser): Promise<TripUser> {
        const document = new TripUserModel({ ...entity })
        await document.save(this.optionsToInsert())

        const createdEntity = new TripUser({ ...document })
        return createdEntity
    }

    async update(entity: TripUser): Promise<TripUser> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await TripUserModel.findOneAndUpdate(
            { _id: entity._id },
            dataToUpdate,
            this.optionsToUpdate()
        )

        const updatedEntity = new TripUser({ ...document })
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await TripUserModel.findOneAndUpdate(
            { _id: id },
            this.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default TripUserRepository