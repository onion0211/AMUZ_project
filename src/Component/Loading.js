import React from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
    return (
        <div calss="contentWrap">
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <FadeLoader color="#0ebf71" height={15} width={5} radius={2} margin={2} />
            </div>
        </div>
    );
};

export default Loading;
