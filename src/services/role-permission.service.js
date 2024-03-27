import { prisma } from "../app/database.js"
import { checkDuplicateByKeys, getResultsAndPagination } from "../helpers/common.js"
import { 
  createRolePermissionValidation, 
  findAllRolePermissionValidation, 
  findByIdRolePermissionValidation 
} from "../validations/role-permission.validation.js"
import { validate } from "../validations/validation.js"

const rolePermissionSelect = { 
  id: true,   
  role : true,
  permission : {
    select : { 
      id : true,
      name : true,
      route : true,
      method : true,
      subMenu : {
        select : { 
          id : true,
          name : true,
          icon : true,
          url : true,
          menu : true
        }
      }
    }
  },
  active : true,
  canUpdateOthers : true,
  createdAt : true,
  updatedAt : true,
}

const create = async (request) => {
  await validate(createRolePermissionValidation, request)
  const now = Math.floor(new Date().getTime() / 1000)
  checkDuplicateByKeys(request, "roleId", "permissionId")

  const rolePermissions = await prisma.rolePermission.findMany({
    where: {
      OR: request.map(data => ({
        roleId: data.roleId,
        permissionId: data.permissionId
      }))
    }
  });

  const rolePermissionsObj = {}
  const rolePermissionsId = []
  for(const rp of rolePermissions) {
    rolePermissionsId.push(rp.id)
    const id = rp.roleId + rp.permissionId
    if(!rolePermissionsObj[id]) {
      rolePermissionsObj[id] = rp
    }
  }

  const data = request.map(req => {
    const curentRolePermission = rolePermissionsObj[req.roleId + req.permissionId]
    const rp = {
      roleId          : req.roleId,
      permissionId    : req.permissionId,
      active          : req.active,
      canUpdateOthers : req.canUpdateOthers,
      createdAt       : now,
      updatedAt       : now,
    }
    if(curentRolePermission) {
      rp['id'] =  curentRolePermission.id
    }
    return rp
  })

  const result = await prisma.$transaction([
    prisma.rolePermission.deleteMany({ 
      where: { id : { in : rolePermissionsId}
    }}),
    prisma.rolePermission.createMany({ data }),
  ])

  return result[1]
}

const findAll  = async (req) => {
  const { results, pagination } = await getResultsAndPagination(findAllRolePermissionValidation, rolePermissionSelect, prisma.rolePermission, req)
  return { results, pagination }
}

const findById = async(id) => {
  await validate(findByIdRolePermissionValidation, { id })

  const get = await prisma.rolePermission.findFirstOrThrow({
    where : { id : id },
    select : rolePermissionSelect
  })

  return get
} 

const update = async(request) => {}

const remove = async(id, request) => {}

export default {
  findAll,
  create,
  findById,
  update,
  remove
}