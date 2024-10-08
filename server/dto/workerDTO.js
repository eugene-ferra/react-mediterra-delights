export default class WorkerDTO {
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
    this.dateOfBirth = responseWorker.dateOfBirth;
    this.startWorkDate = responseWorker.startWorkDate;
  }
}
