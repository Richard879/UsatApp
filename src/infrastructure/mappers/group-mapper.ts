import type { Group } from '../../domain/entities/group';
import type { IGroup } from '../interfaces/group.response';

export class GroupMapper {
    static fromGroupToEntity( item : IGroup): Group {
        return {
            idGrupo: item.idGrupo,
            descripcion: item.descripcion
        }
    }
}