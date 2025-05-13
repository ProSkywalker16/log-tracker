import React, { useEffect, useState, useRef } from "react";
import { data, useParams } from "react-router-dom";
import L from 'leaflet';

const IPInfo = () => {
    const { ip } = useParams();
    const [mapData, setMappedData] = useState(new Map());
    const [latlng, setCoords] = useState([51.505, -0.09]);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current == null){
            mapRef.current = L.map("map").setView(latlng, 13);
        } // prevent re-initialization

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);
        L.marker(latlng).addTo(mapRef.current);
        console.log('val of latlng');
        console.log(latlng);

        return () => {
        mapRef.current?.remove(); // clean up map on unmount
        mapRef.current = null;
        };
    }, [latlng]);
    
    useEffect(() => {
        const fetchIPInfo = async () => {
            try {
                const response = await fetch(`http://192.168.0.170:5000/log_storage/ipinfo?ip_address=${ip}`);
                const data = await response.json();
                const md = new Map(Object.entries(JSON.parse(data)));
                setMappedData(md);
                const ll = [parseFloat(md.get("latitude")), parseFloat(md.get("longitude"))];
                console.log(ll)
                setCoords(ll);
                console.log("setCoords called");
                console.log(latlng)
            } catch (error) {
                console.error(error);
            }
        };

        fetchIPInfo();
    }, [ip]);
    
    if (mapData == {}) {
        return (
            <div>
                Loading
            </div>
        )
        /*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([mapData.get("latitude"), mapData.get("longitude")]).addTo(map);*/
    }
    else {
    return (
        <main className="sm:ml-28 text-white p-5 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">IP Information</h2>
            {
                (
                    <>
                        <p className="text-lg">IP Address: {ip}</p>
                        <p className="text-lg">bogon: {mapData.get("bogon") ? "true" : "false"}</p>
                        <p className="text-lg">City: {mapData.get("city")}</p>
                        <p className="text-lg">Region: {mapData.get("region")}</p>
                        <p className="text-lg">Country: {mapData.get("country")}</p>
                        <p className="text-lg">Latitude: {mapData.get("latitude")}</p>
                        <p className="text-lg">Longitude: {mapData.get("longitude")}</p>
                    </>
                )
            }
            { (
                <>
                    <div id="map" style={{ height: "180px" }}>

                    </div>
                </>
            )}
        </main>
    );}
};

export default IPInfo;