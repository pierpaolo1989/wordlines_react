import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

function Support() {

    const navigate = useNavigate()

    const home = () => {
        navigate("/");
    }




const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "Lorem ipsum dolor sit amet,",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
        },
        {
            title: "Come posso riscattare i miei punti?",
            content:
                "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
        },
        {
            title: "Con quali cripto posso convertire i miei punti?",
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.2.1</p>,
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "blue",
    rowTitleColor: "blue",
    rowContentPaddingBottom: '10px',
    rowContentPaddingLeft: '10px',
    rowContentPaddingright: '10px',
    rowContentPaddingTop: '5px',
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
     animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

    return (
        <div className="App-header">
            <div className="p-5">
            <Faq 
                data={data}
                styles={styles}
                config={config}
            />
            </div>
            or Contact us: <a href="mailto:pierpaolo.pdd@gmail.com">wordlines@mail.io</a>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded border mt-4"
                onClick={() => home()}>
                Home
            </button>
        </div>
    );
}


export default Support;