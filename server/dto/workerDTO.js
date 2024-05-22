import { CommentDTO } from "./commentDTO.js";

export class WorkerDTO {
  id;
  name;
  lastName;
  positionType;
  position;
  summary;
  additionalInfo;
  photo;
  dateOfBirth;
  startWorkDate;

  constructor(responseWorker) {
    this.id = responseWorker._id;
    this.name = responseWorker.name;
    this.lastName = responseWorker.lastName;
    this.positionType = responseWorker.positionType;
    this.position = responseWorker.position;
    this.summary = responseWorker.summary;
    this.additionalInfo = responseWorker?.additionalInfo || null;
    this.photo = {
      jpg: responseWorker.photo.jpg,
      webp: responseWorker.photo.webp,
      avif: responseWorker.photo.avif,
    };
    this.dateOfBirth = {
      day: responseWorker.dateOfBirth.day,
      month: responseWorker.dateOfBirth.month,
      year: responseWorker.dateOfBirth.year,
    };
    this.startWorkDate = {
      month: responseWorker.startWorkDate.month,
      year: responseWorker.startWorkDate.year,
    };
  }
}
