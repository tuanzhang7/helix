export interface Iitq {
  _id: string;
  name: String,
  description: String,
  resources: [
    {
      subject: String,
      folder: String,
        topics: [
        {
          SNo: String,
          topic: String,
          itqsynopsis: String,
          mcesynopsis: String,
          addinfo: String,
          resID: String,
          duration: String,
          startfile: String
        }
      ]
    }
  ]
}
