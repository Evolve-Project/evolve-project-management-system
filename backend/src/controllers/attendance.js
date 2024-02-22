exports.createAttendance = (req, res) => {
    console.log(req.body)
    console.log(req.user.role)
    console.log("called");
    if (req.user.role != "Mentor") {
        res.status(400).json({
            success: false,
            message: "UnAuthorized Request"
        })
    } else {
        console.log(req.body)
        res.status(200).json({
            success: true,
            message: "attendance created successfully"
        })
    }

}