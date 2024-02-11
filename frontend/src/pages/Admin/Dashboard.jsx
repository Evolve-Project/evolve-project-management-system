import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const DashboardAdmin = () => {
    return (<>
    <div className="flex text-center">
    <Card className="w-60 mr-20 ml-20">
  <CardHeader >
    <CardTitle>Total Mentor</CardTitle>
  </CardHeader>
  <CardContent >
  <div className="flex justify-center items-center h-full">
    <p className="text-4xl">45</p>
    </div>
  </CardContent>
  <CardFooter >
    <p className=" text-violet-700">All Mentors -&gt;</p>
  </CardFooter>
</Card> 
<Card className="w-60 mr-20">
  <CardHeader>
    <CardTitle>Total Mentee</CardTitle>
  </CardHeader>
  <CardContent>
  <div className="flex justify-center items-center h-full">
    <p className="text-4xl">145</p>
    </div>
  </CardContent>
  <CardFooter>
    <p className=" text-violet-700">All Mentee -&gt;</p>
  </CardFooter>
</Card> 
<Card className="w-60">
  <CardHeader>
    <CardTitle>Total Projects</CardTitle>
  </CardHeader>
  <CardContent>
  <div className="flex justify-center items-center h-full">
    <p className="text-4xl">25</p>
    </div>
  </CardContent>
  <CardFooter>
    <p className=" text-violet-700">All Projects -&gt;</p>
  </CardFooter>
</Card> 
    </div>
    </>)
}
export default DashboardAdmin