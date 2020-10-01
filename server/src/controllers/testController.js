module.exports = {
  
  async getTest (req, res) {
    try{
      res.status("200")
      res.send("TEST MY ROUTE WITH CONTROLLERS (get request)")
    }
    catch (err) {
      res.status("500")
      res.send("TEST ERROR", err)
    }
  },
  
  async postTest (req, res) {
    res.status("200")
    res.send("TEST MY ROUTE WITH CONTROLLERS (post request)")
  }
  
}
