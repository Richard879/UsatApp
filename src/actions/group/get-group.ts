import { apiRusia } from "../../config/api/apiRusia"
import { Group } from "../../domain/entities/group";
import { GroupResponseApi } from '../../infrastructure/interfaces/group.response';
import { GroupMapper } from "../../infrastructure/mappers/group-mapper";

export const getGroup = async():Promise<Group[]> =>{
    try {
        const groups = await apiRusia.get<GroupResponseApi>('/v2.0/Group/GetAll/');
        // console.log(groups.data.data.map(GroupMapper.fromGroupToEntity));
        return groups.data.data.map(GroupMapper.fromGroupToEntity);
    } catch (error) {
        console.log(error);
        throw new Error("Error getting groups");
    }
}