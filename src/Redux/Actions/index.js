import {
  GET_PETS,
  GET_ADOPTION_PETS,
  GET_LOST_PETS,
  GET_PET_ID,
  GET_ALL_USERS,
  GET_USER_ID,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  GET_VETERINARIES,
  GET_DETAILS_VETERINARIES,
  POST_PET,
  UPDATE_PET,
  POST_USER,
  POST_PRODUCT,
  POST_VET,
  FILTER_ADOPTION_VALUES,
  FILTER_BY_SEARCH_AREA,
  SHOP_SEARCH_INPUT_NAME,
  SHOP_FILTER_VALUE,
  NEXT_PAGE,
  PREV_PAGE,
  ACTUAL_PAGE,
  UPDATE_PRODUCT,
  UPDATE_USER,
  UPDATE_VET,
  MODIFY_PRODUCT,
  SET_IMAGE,
  DELETE_PET,
} from "../ActionTypes";
import { header } from "../../utils";
import axios from "axios";

export function getAllUsers() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/users");
      return dispatch({
        type: GET_ALL_USERS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPets(value) {
  return async function (dispatch) {
    try {
      if (value === undefined) {
        const json = await axios.get(`/pets`);
        const payload = {
          allPets: json.data,
          value,
        };
        return dispatch({
          type: GET_PETS,
          payload,
        });
      }
      if (value === "lostPets") {
        const json = await axios.get(`/pets`);
        const lostPets = json.data.filter((pet) => pet.status === "perdido");
        const payload = {
          lostPets,
          value,
        };
        return dispatch({
          type: GET_PETS,
          payload,
        });
      }
      if (value === "adoptions") {
        const json = await axios.get(`/pets`);
        const adoptionPets = json.data.filter(
          (pet) => pet.status === "encontrado"
        );
        const payload = {
          adoptionPets,
          value,
        };
        return dispatch({
          type: GET_PETS,
          payload,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserId(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/users/${id}`);
      return dispatch({ type: GET_USER_ID, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAdoptionPets() {
  return async function (dispatch) {
    try {
      const allPets = await axios.get(
        "https://backanimals-production.up.railway.app/pets"
      );
      return dispatch({
        type: GET_ADOPTION_PETS,
        payload: allPets.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLostPets() {
  return async function (dispatch) {
    try {
      const allPets = await axios.get(
        `https://backanimals-production.up.railway.app/pets`
      );
      return dispatch({
        type: GET_LOST_PETS,
        payload: allPets.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const petDetails = (id) => async (dispatch) => {
  try {
    const getID = await axios.get(`/pets/${id}`);
    return dispatch({
      type: GET_PET_ID,
      payload: getID.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export function postPet(formInput, token) {
  return async function (dispatch) {
    try {
      const config = header(token);
      const json = await axios.post(`/pets`, formInput, config);
      return dispatch({
        type: POST_PET,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postUser(formInput) {
  return async function (dispatch) {
    try {
      const newUser = await axios.post(`/users`, formInput);
      return dispatch({
        type: POST_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(userID, formInput) {
  return async function (dispatch) {
    try {
      console.log("Action updateUSER", userID);
      await axios.put(`/users/${userID}`, formInput);

      dispatch({
        type: UPDATE_USER,
      });
    } catch (error) {
      console.log("Action updateUSER", userID, formInput);
    }
  };
}

export function updateVet(vetId, formInput) {
  return async function (dispatch) {
    try {
      await axios.put(`/veterinary/${vetId}`, formInput);
      dispatch({
        type: UPDATE_VET,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postProduct(formInput) {
  return async function (dispatch) {
    try {
      const newProduct = await axios.post(`/products`, formInput);
      return dispatch({
        type: POST_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postVet(formInput) {
  return async function (dispatch) {
    try {
      const newVet = await axios.post(`/veterinary`, formInput);
      return dispatch({
        type: POST_VET,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function filterAdoptionPets(arrayFilterValues, value) {
  return async function (dispatch) {
    try {
      const payload = {
        arrayFilterValues,
        value,
      };
      dispatch({
        type: FILTER_ADOPTION_VALUES,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterBySearchArea(inputValue, value) {
  return async function (dispatch) {
    try {
      let payload = {
        inputValue,
        value,
      };
      return dispatch({
        type: FILTER_BY_SEARCH_AREA,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const allProducts = await axios.get(`/products`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: allProducts.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductDetail(obj) {
  return async function (dispatch) {
    try {
      const productDetail = await axios.get(`/products/${obj.id}`);
      productDetail.data[0].handlerSetCart = obj.handlerSetCart;
      productDetail.data[0].handleRemoveItemCart = obj.handleRemoveItemCart;
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: productDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function shopSearchInputName(input) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: SHOP_SEARCH_INPUT_NAME,
        payload: input,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const Prev = (actualPage) => (dispatch) => {
  try {
    let next = actualPage - 1;
    dispatch({
      type: PREV_PAGE,
      payload: next,
    });
  } catch (error) {
    console.log(error);
  }
};
export const Next = (actualPage) => (dispatch) => {
  try {
    let next = actualPage + 1;
    dispatch({
      type: NEXT_PAGE,
      payload: next,
    });
  } catch (error) {
    console.log(error);
  }
};
export const ActualPage = (page) => (dispatch) => {
  try {
    dispatch({
      type: ACTUAL_PAGE,
      payload: page,
    });
  } catch (error) {
    console.log(error);
  }
};

export function shopFilterValue(value) {
  return async function (dispatch) {
    try {
      dispatch({
        type: SHOP_FILTER_VALUE,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllVeterinaries() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/veterinary");
      return dispatch({
        type: GET_VETERINARIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const VeterinaryDetails = (id) => async (dispatch) => {
  try {
    const getID = await axios.get(`/veterinary/${id}`);
    return dispatch({
      type: GET_DETAILS_VETERINARIES,
      payload: getID.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export function setStatusUser(id) {
  //preguntar si se manda en obj o array la data
  return async function (dispatch) {
    try {
      await axios.put(`/users/setStatusUser/${id}`);
      const updatedUsers = await axios.get(`/users`);
      dispatch({
        type: GET_ALL_USERS,
        payload: updatedUsers.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateProduct(id, formInput) {
  return async function (dispatch) {
    try {
      console.log("Action updateProduc", id);
      await axios.put(`$/products/${id}`, formInput);
      // const updatedProduct = await axios.get(`/products`)
      dispatch({
        type: UPDATE_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function modifyProduct(obj) {
  return async function (dispatch) {
    try {
      console.log("modifyProduct", obj);
      return dispatch({
        type: MODIFY_PRODUCT,
        payload: obj,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postOrUpdatePet(formInput, value, petId) {
  return async function (dispatch) {
    try {
      if (value === "update") {
        console.log("ACTION CASO UPDATE");
        console.log("FORM INPUT", formInput);
        console.log("VALUE", value);
        console.log("PETID", petId);
        const userLocalstorage = JSON.parse(
          localStorage.getItem("loggedUser")
        )[0];
        console.log("USERLOCALSTORAGE: ", userLocalstorage);
        let json = await axios.put(`$/pets/${petId}`, formInput);
        return dispatch({
          type: UPDATE_PET,
        });
      } else {
        const userId = JSON.parse(localStorage.getItem("loggedUser"))[0].id;
        console.log("USER ID ACTION CASO POST", userId);
        formInput = { ...formInput, userId };
        console.log("LOG ACTION CASO POST", formInput, value, petId);
        let json = await axios.post(`/pets`, formInput);
        console.log(formInput, value, petId);
        return dispatch({
          type: POST_PET,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function setImageAsync(obj) {
  console.log("OBJJJ", obj);
  return async function (dispatch) {
    try {
      const files = obj;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "buddycare");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/lucho123/image/upload/",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      console.log("SECURE_URL", file.url);
      return dispatch({
        type: SET_IMAGE,
        payload: file.url,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function deletePet(idPet, idUser) {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`/pets/${idPet}`);
      const json2 = await axios.get(`/users/${idUser}`);
      return dispatch({
        type: DELETE_PET,
        payload: json2.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deletePetAdmin(id) {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`/pets/${id}`);
      const json2 = await axios.get(`/pets`);
      return dispatch({
        type: GET_PETS,
        payload: { allPets: json2.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
