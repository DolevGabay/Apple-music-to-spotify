import React from 'react';
import { startAuth } from '../modules/authUtils';
import {useDispatch} from 'react-redux';
import { setSource } from '../redux/actions/transferActions';

const Home = () => {
    const dispatch = useDispatch();

    const startTransfer = async (streamer) => {
        dispatch(setSource(streamer));
        startAuth(streamer);
    }
    return(
        <div>
           <header className="bg-dark">
            <div className="container pt-4 pt-xl-5">
              <div className="row pt-5">
                <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
                  <div className="text-center">
                    <p className="fw-bold text-success mb-2">Welcome to MD Solutions</p>
                    <h1 className="fw-bold">Migrate your music libraries Easily!</h1>
                  </div>
                </div>
                <div className="col-12 col-lg-10 mx-auto">
                  <section>
                    <div className="container py-5">
                      <div className="mx-auto" style={{ maxWidth: '900px' }}>
                        <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">
                          <div className="col mb-4">
                            <div className="card bg-info-light">
                              <div className="card-body text-center px-4 py-5 px-md-5">
                                <img
                                  src="assets/img/spotify-logo.png"
                                  style={{ width: '15%', height: '100%', paddingTop: '0px', marginTop: '-45px' }}
                                />
                                <p className="fw-bold text-info card-text mb-2" style={{ fontSize: '20px' }}>
                                  Spotify
                                </p>
                                <h1 style={{ fontSize: '13.3px', marginBottom: '17px' }}>
                                  <strong>
                                    Connect to your Spotify account, select the playlists and then connect to your Apple Music
                                    account.
                                  </strong>
                                </h1>
                                <button className="btn btn-info btn-sm" type="button" onClick={() => startTransfer('Spotify')}>
                                  Connect
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col mb-4">
                            <div className="card bg-secondary-light">
                              <div className="card-body text-center px-4 py-5 px-md-5">
                                <img
                                  src="assets/img/apple-logo.png"
                                  style={{ width: '22%', height: '100%', marginTop: '-59px', paddingTop: '0px', marginBottom: '-18px' }}
                                />
                                <p className="fw-bold text-secondary card-text mb-2" style={{ fontSize: '20px' }}>
                                  Apple Music
                                </p>
                                <h5 className="fw-bold card-title mb-3" style={{ fontSize: '13.5px' }}>
                                  Connect to your Apple Music account, select the playlists and then connect to your Spotify account.
                                </h5>
                                <button className="btn btn-secondary btn-sm" type="button" onClick={() => startTransfer('Apple')}>
                                  Connect
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="position-relative" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <div style={{ position: 'relative', flex: '0 0 45%', transform: 'translate3d(-15%, 35%, 0)' }}>
                      <img className="img-fluid" data-bss-parallax="" data-bss-parallax-speed="0.8" src="assets/img/products/theweekend.jpg" />
                    </div>
                    <div style={{ position: 'relative', flex: '0 0 45%', transform: 'translate3d(-5%, 20%, 0)' }}>
                      <img className="img-fluid" data-bss-parallax="" data-bss-parallax-speed="0.4" src="assets/img/products/drake.jpg" />
                    </div>
                    <div style={{ position: 'relative', flex: '0 0 60%', transform: 'translate3d(0, 0%, 0)' }}>
                      <img
                        className="img-fluid"
                        data-bss-parallax=""
                        data-bss-parallax-speed="0.25"
                        src="assets/img/products/wp4240793-post-malone-beerbongs-and-bentleys-wallpapers.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <section className="py-5 mt-5" id='about'>
            <div className="container py-5">
              <div className="row mb-5" style={{ marginTop: '0px', paddingBottom: '0px', marginBottom: '30px' }}>
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <p className="fw-bold text-success mb-2">About us</p>
                  <h2 className="fw-bold"><strong>Who we are and what we do?</strong></h2>
                  <p className="text-muted">MD solutions</p>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 d-sm-flex justify-content-sm-center" style={{ marginTop: '-47px' }}>
                <div className="col mb-4">
                  <div className="d-flex flex-column align-items-center align-items-sm-start">
                    <p className="bg-dark border rounded border-dark p-4">Couple of CS students at Reichman University, served together in the IDF, and we decided to help people transfer their favorite music playlists from one music streamer to another. Let us know if you liked our website!</p>
                    <div className="d-xl-flex flex-row justify-content-xl-center align-items-xl-center">
                      <div className="d-flex">
                        <img className="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src="assets/img/team/avatar4.jpg" alt="Matan Tzach" />
                        <div>
                          <p className="fw-bold text-primary mb-0">Matan Tzach</p>
                          <p className="text-muted mb-0">Cs Student</p>
                        </div>
                      </div>
                      <div className="d-flex" style={{ marginLeft: '11px' }}>
                        <img className="rounded-circle flex-shrink-0 me-3 fit-cover" width="50" height="50" src="assets/img/team/avatar2.jpg" alt="Dolev Gabay" />
                        <div>
                          <p className="fw-bold text-primary mb-0">Dolev Gabay</p>
                          <p className="text-muted mb-0">Cs Student</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <a className="btn btn-primary shadow" role="button" href="/Contact">Contact Us</a>
              </div>
            </div>
          </section>
          <footer className="bg-dark">
            <div className="container py-4 py-lg-5">
              <div className="text-muted d-flex justify-content-between align-items-center pt-3">
                <p className="mb-0">Copyright © 2023 Brand</p>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-facebook">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                    </svg>
                  </li>
                  <li className="list-inline-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-twitter">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg>
                  </li>
                  <li className="list-inline-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-instagram">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
            
        </div>
    );
};

export default Home;