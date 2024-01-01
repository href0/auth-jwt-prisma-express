import userService from "../services/user.service.js";

export const dateToString = (date = null) => {
  date = date ? new Date(waktu) : new Date();

  const tahun = date.getFullYear();
  const bulan = String(date.getMonth() + 1).padStart(2, '0');
  const hari = String(date.getDate()).padStart(2, '0');

  const jam = String(date.getHours()).padStart(2, '0');
  const menit = String(date.getMinutes()).padStart(2, '0');
  const detik = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${tahun}-${bulan}-${hari} ${jam}:${menit}:${detik}`;
  return formattedDate;
}

export const addLinksToPagination = (baseUrl, curentUrl, data, pagination, filter) =>{
  filter.page    = filter.page || 1
  filter.perPage = filter.perPage || userService.DEFAULT_PER_PAGE
  let nextPage = Number(filter.page) + 1
  if( filter.page >= pagination.totalPages ) {
    nextPage = null
  }

  const firstUrl = (data.length > 0 || pagination.totalPages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${1}`) : null
  const lastUrl = (data.length > 0 || pagination.totalPages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${pagination.totalPages}`) : null
  const nextUrl = nextPage ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${nextPage}`) : null
  const prevUrl = filter.page > 1 ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${Number(filter.page) - 1}`) : null
  const links = {
    next  : nextUrl,
    prev  : prevUrl,
    first : firstUrl,
    last  : lastUrl
  }
  pagination.links = links

  return pagination
}