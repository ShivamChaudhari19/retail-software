import axios from "axios"

export const addCategory = async (category) => {
  return await axios.post('http://localhost:8080/api/v1.0/category', category)
}

export const deleteCategory = async (categoryID) => {
    return await axios.delete(`'http://localhost:8080/api/v1.0/category'${categoryID}`)
}

export const fetchCategories = async() => {
    return await axios.get(`'http://localhost:8080/api/v1.0/category'`)
}

