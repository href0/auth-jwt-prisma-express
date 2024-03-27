import { object, string, number, date, array,  } from 'yup';

const createRolePermissionValidation = array()
  .of(
    object({
      roleId: number().strict(true).required(),
      permissionId: number().strict(true).required(),
      active: number().strict(true),
      canUpdateOthers: number().strict(true),
    })
  )
  .min(1) // Set minimum number of elements in the array
  .max(100); // Set maximum number of elements in the array

// const updateRolePermissionValidation = object({
//   // id : number().strict(true).required(),
//   roleId : number().strict(true).required(),
//   permissionId : number().strict(true).required(),
//   active : number().strict(true),
//   canUpdateOthers : number().strict(true),
// })

const findByIdRolePermissionValidation = object({
  id : number().strict(true).required()
})

const findAllRolePermissionValidation = object({
  page    : number().notRequired(),
  perPage : number().notRequired().max(300),
  sort    : string().oneOf(['asc', 'desc']).notRequired(),
  sortBy  : string().oneOf(['id', 'roleId', 'permissionId']).notRequired(),
})

// const removeRolePermissionValidation = object({
//   id : number().strict(true).required()
// })

export {
  findByIdRolePermissionValidation,
  createRolePermissionValidation,
  // updateRolePermissionValidation,
  // removeRolePermissionValidation,
  findAllRolePermissionValidation,
}