import React, { Component } from "react";
import { FacebookIcon, InstagramIcon, YoutubeIcon, SpotifyIcon } from "../shared";
import "./Footer.scss";

export default class Footer extends Component {
    render() {
        return (
            <footer className="py-2">
                <div className="container d-flex justify-content-between align-items-center">
                    <span>Contact Us</span>

                    <div className="d-flex justify-content-center align-items-center social-icons">
                        <a
                            className="nav-link"
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/Mohamd.Ha4em/"
                            aria-label="Facebook"
                        >
                            <FacebookIcon size={20} />
                        </a>

                        <a
                            className="nav-link"
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/Mohamd.Ha4em/"
                            aria-label="Instagram"
                        >
                            <InstagramIcon size={20} />
                        </a>

                        <a
                            className="nav-link"
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/Mohamd.Ha4em/"
                            aria-label="YouTube"
                        >
                            <YoutubeIcon size={20} />
                        </a>

                        <a
                            className="nav-link"
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/Mohamd.Ha4em/"
                            aria-label="Spotify"
                        >
                            <SpotifyIcon size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}
