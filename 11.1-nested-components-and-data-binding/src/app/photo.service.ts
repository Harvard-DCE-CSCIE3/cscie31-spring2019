import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
  // track maxId value, will be incremented when we create()
  maxId = 3;

  // hardcoded photolist
  photoList = [
    {
      _id: 1,
      title:'Champ Wheelin\' on the Beach',
      description:'this is my first photo',
      imageurl:'assets/img/champ-wheelin-on-the-beach.jpg'
    },
    {
      _id: 2,
      title:'Let Sleeping Dogs Lie',
      description:'this is my first photo',
      imageurl:'assets/img/ripley-and-tilda.jpg'
    },
    {
      _id: 3,
      title:'Beach Play',
      description:'this is my first photo',
      imageurl:'assets/img/dogs2.jpg'
    }
  ];

  constructor() { }

  // two basic read methods follow: list and "getOne"
  listPhotos(){
    return this.photoList;
  }

  getPhoto(id){
    return this.photoList.find((el) => {return el._id == id});
  }

  // Other CRUD methods could be adapted to work with the photoList array
  // for client application development prior to the API being available.
  // These are kind of a temporary bridge to our "real" data service which
  // will use HTTP.  I shoud note that I didn't actually test these as
  // written below.   

  createPhoto(photoObject){
    if (!photoObject._id){
      photoObject._id = ++this.maxId;
    }
    this.photoList.push(photoObject);
    return this.photoList[photoObject._id];
  }

  updatePhoto(id, data){
    let photo = this.getPhoto(id);
    if (photo){
      photo = Object.assign(photo, data);
      return photo;
    } else {
      return null;
    }
  }

  deletePhoto(id){
    let photo = this.getPhoto(id);
    if (photo){
        this.photoList = this.photoList.filter(el => el._id != id);
    }
  }

}
