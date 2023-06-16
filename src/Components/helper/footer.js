export default function Footer(){
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem('role');

    if(role != null && isAuthenticated != null){
        if(isAuthenticated && role.toLowerCase() === 'admin'){
            return(
                <>
                    <footer id="footer" class="footer">
                        <div class="copyright">
                            &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
                        </div>
                        <div class="credits">
                            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                        </div>
                    </footer>
                    <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
                        <i class="bi bi-arrow-up-short"></i>
                    </a>
                </>
                
                // <!-- End Footer -->
                // <div className="container-fluid text-center text-md-left">
                //     <div className="row">
                //         <div className="col-md-6 mt-md-0 mt-3">
                //             <div className="footer-copyright text-left py-3">© Company:
                //                 <a href="https://infistack.com/"> Infistack.com</a>
                //             </div>
                //             {/* <a className="nav-item nav-link active" href='/' >Home</a>  */}
                //         </div>
                //     </div>
                // </div>
            )
        }
    }
    return(
        <div className = "footer-copyright text-center py-3">© Company:
            <a href="https://infistack.com/"> Infistack.com</a>
        </div>
    )
}