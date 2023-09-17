import React from "react";

function Map() {
  return (
    <div className="map">
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.728787936982!2d36.2477094!3d50.0164384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0d65c4cbff7%3A0xaa1b6224b0c3dfd4!2z0LLRg9C70LjRhtGPINCh0YPQvNGB0YzQutCwLCAxMjMsINCl0LDRgNC60ZbQsiwg0KXQsNGA0LrRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDYxMDAw!5e0!3m2!1sru!2sua!4v1694863258289!5m2!1sru!2sua"
        width="600"
        height="450"
        style={{ border: 0, width: "100%" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
