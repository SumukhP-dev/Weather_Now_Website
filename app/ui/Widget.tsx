import { useEffect } from "react";

export default function Widget() {
  useEffect(() => {
    function(d,s,id) {
      var js,fjs=d.getElementsByTagName(s)[0];
      if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src='https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js,fjs);
      }}(document,'weatherwidget-io-js');
  }, []);
  return (
    <div className="weather">
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/en/41d28n73d50/ridgefield/?unit=us"
        data-label_1="RIDGEFIELD"
        data-label_2="WEATHER"
        data-days="3"
        data-theme="pure"
      >
        RIDGEFIELD WEATHER
      </a>
    </div>
  );
}
