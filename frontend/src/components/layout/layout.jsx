import Navbar from '../navbar/navbar'

const Layout = ({ children }) => {
    return (
        <div className='container'>
            <Navbar />
            <div>{children}</div>
        </div>
    )
}

export default Layout