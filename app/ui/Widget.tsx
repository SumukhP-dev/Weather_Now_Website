import { useEffect } from "react";
import {document} from "../../node_modules/typescript/lib/typescript.js"

export default function Widget() {
  useEffect(() => {
    (document,'weatherwidget-io-js');
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
