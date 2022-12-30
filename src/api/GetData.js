import getApi from "./GetAPI";

const getAll = async () => {
  try {
    const response = await getApi.get('getall.php');

    if (response.data.success) {
      // console.log(response.data.news)
      return response.data.news;
    }
  } catch (error) {
    console.log('Error while getting all news.', error.message);
    return [];
  }
};

const getSingle = async (id) => {
  try {
    const response = await getApi.get(`getsingle.php?idArticle=${id}`);

    if (response.data.success) {
      return response.data.news;
    }
  } catch (error) {
    console.log('error while getting single news', error);
  }
};

const getByCategory = async (category, qty) => {
  const endpoint = `getarticlebycategory.php`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyForm = new FormData();
  bodyForm.append('idCategory', category);

  try {
    const response = await getApi.post(endpoint, bodyForm, config);

    if (response.data.success) {
      return response.data.news;
    }
  } catch (error) {
    console.log('Error while getting categories news.', error.message);
    return [];
  }
};

const searchPost = async keyword => {
  if (!keyword) return {};
  const endpoint = `getsearch.php`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyForm = new FormData();
  bodyForm.append('keyword', keyword);

  try {
    const response = await getApi.post(endpoint, bodyForm, config);
    return response.data;
    
  } catch (error) {
    console.log('Error while searching - searchPost newsAPi', error);
  }
};

const getVideo = async () => {
  try {
    const response = await getApi.get('getvideo.php');

    if (response.data.success) {
      console.log(response.data)
      return response.data.videos;
    }
  } catch (error) {
    console.log('Error while getting all news.', error.message);
    return [];
  }
};

const getByDay = async () => {
  try {
    const response = await getApi.get('getbyday.php')
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getarticlebycategory = async (idCategory) => {
  const endpoint = `getarticlebycategory.php`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyForm = new FormData();
  bodyForm.append('idCategory', idCategory);

  try {
    const response = await getApi.post(endpoint, bodyForm, config);
    return response.data;
    
  } catch (error) {
    console.log(error.message);
  }
}


const getcategory = async () => {
  try {
    const response = await getApi.get('getcategoryweb.php')
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getVideoWeb = async () => {
  try {
    const response = await getApi.get('getvideoweb.php');

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.log('Error while getting all news.', error.message);
    return [];
  }
}; 

const getNewsWeb = async () => {
  try {
    const response = await getApi.get('getnewsweb.php')
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getVideoByid = async (id) => {
  try {
    const response = await getApi.get(`getvideobyid.php?idvideo=${id}`)
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

const searchNews = async (keyword) => {
  if (!keyword) return {};

  const endpoint = 'getsearch.php';
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyForm = new FormData();
  bodyForm.append('keyword', keyword);

  try {
    const response = await getApi.post(endpoint, bodyForm, config);
    return response.data;
    
  } catch (error) {
    console.log('Error while searching - searchPost newsAPi', error);
  }
}

const signUp = async ({email,username,password}) => {

  const endpoint = 'apilo.php?lo=signup';
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyForm = new FormData();
  // bodyForm.append('name', name);
  bodyForm.append('username', username);
  bodyForm.append('email', email);
  bodyForm.append('password', password);

  try {
    const response = await getApi.post(endpoint, bodyForm, config);
    
    return response.data;
    
  } catch (error) {
    console.log('Error while send - searchPost newsAPi', error);
  }
}

const login = async ({username,password}) => {

  const endpoint = 'apilo.php?lo=login';
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyForm = new FormData();
  bodyForm.append('username', username);
  bodyForm.append('password', password);

  try {
    const response = await getApi.post(endpoint, bodyForm, config);
    
    return response.data;
    
  } catch (error) {
    console.log('Error while send - searchPost newsAPi', error);
  }
}

const saveNews = async (id_user, idArticle) => {

  const endpoint = 'savenews.php';
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyForm = new FormData();
  bodyForm.append('iduser', id_user);
  bodyForm.append('idarticle', idArticle);

  try {
    const response = await getApi.post(endpoint, bodyForm, config);
    return response.data;
    
  } catch (error) {
    console.log('Error while save - searchPost newsAPi', error);
  }
}

const getNewsSave = async (id_user) => {
  try {
    const response = await getApi.get(`getsavenews.php?iduser=${id_user}`)
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
}



export default {
  getByDay,
  getAll,
  getByCategory,
  getSingle,
  searchPost,
  getVideo,
  getarticlebycategory,
  getcategory,
  getVideoWeb,
  getNewsWeb,
  getVideoByid,
  searchNews,
  signUp,
  login,
  saveNews,
  getNewsSave
};
