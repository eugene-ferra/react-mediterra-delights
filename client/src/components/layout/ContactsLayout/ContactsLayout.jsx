import { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { useOrderOptions } from "../OrderBox/useOrderOptions";
import PageLoader from "../PageLoader/PageLoader";
import Text from "../../common/Text/Text";
import Container from "../Container/Container";
import "leaflet/dist/leaflet.css";
import styles from "./ContactsLayout.module.scss";
import marker from "../../../assets/marker.svg";

const ContactsLayout = () => {
  const { options, isLoading } = useOrderOptions();
  const mapRef = useRef();
  const [currLink, setCurrLink] = useState(0);

  function handleOnFlyTo(pos, index) {
    setCurrLink(index);
    mapRef.current.flyTo(pos, 17);
  }

  return (
    <>
      <Container className={styles.container}>
        {isLoading && <PageLoader />}

        {!isLoading && options && (
          <div className={styles.inner}>
            <div className={styles.left}>
              <div className={styles.places}>
                <Text type={"big"} className={styles.title}>
                  Наші ресторани в м.Харків:
                </Text>
                {options?.pickupLocation?.map((place, i) => (
                  <button
                    key={place}
                    onClick={() => handleOnFlyTo(options?.shopGeo?.[i], i)}
                    className={`${currLink == i ? styles.placeActive : styles.place}`}
                  >
                    {place}
                  </button>
                ))}
              </div>

              <div>
                <Text type={"big"} className={styles.title}>
                  Графік роботи:
                </Text>
                <Text>Пн-Пт: 8:00 - 23:00</Text>
                <Text>Сб-Нд: 8:00 - 23:00</Text>
                <Text type={"small"} className={styles.subBlock}>
                  Працюємо і доставляємо їжу лише в м.Харків!
                </Text>
              </div>

              <div>
                <Text type={"big"} className={styles.title}>
                  Служба підтримки:{" "}
                </Text>
                <Link to={"tel:+380689393933"} className={styles.link}>
                  +38(068)93-93-933
                </Link>

                <Text type={"big"} className={styles.title}>
                  Гаряча ліня:{" "}
                </Text>
                <Link to={"tel:	0800999333"} className={styles.link}>
                  0 800 999 333
                </Link>
              </div>
            </div>

            <MapContainer
              center={options?.shopGeo?.[0]}
              zoom={15}
              scrollWheelZoom={true}
              ref={mapRef}
              className={styles.map}
            >
              <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {options?.shopGeo?.map((item, i) => (
                <Marker
                  icon={new L.icon({ iconUrl: marker, iconSize: [50, 50] })}
                  position={item}
                  key={options?.pickupLocation?.[i]}
                  eventHandlers={{
                    click: () => {
                      handleOnFlyTo(options?.shopGeo?.[i], i);
                    },
                  }}
                >
                  <Popup key={options?.pickupLocations?.[i]}>
                    {options?.pickupLocation?.[i]}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </Container>
    </>
  );
};

export default ContactsLayout;
