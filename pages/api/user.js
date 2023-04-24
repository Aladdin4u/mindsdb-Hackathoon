export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        // window.localStorage.setItem("team", JSON.stringify(req.body));

        console.log("req===>", req.body)
        res.status(201).json({ msg: 'success' })
    } else {
          res.status(200).json({ name: 'John Doe' })
        // Handle any other HTTP method
      }
  }