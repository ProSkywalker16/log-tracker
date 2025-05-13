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
                // const response = await fetch(`http://192.168.0.170:5000/log_storage/ipinfo?ip_address=${ip}`);
                const response = await fetch(`http://192.168.0.182:5000/log_storage/ipinfo?ip_address=${ip}`);
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
// ...existing code...
return (
  <main className="sm:ml-28 text-white p-10 rounded shadow-md">
    <h2 className="text-2xl font-bold mb-4">IP Information</h2>

    <div className="flex flex-col md:flex-row p-10 gap-6">
      {/* Table */}
      <table className="min-w-[300px] md:w-1/2 bg-[#bfbfbf21] text-white rounded shadow border border-gray-700">
        <tbody>
          <tr>
            <th className="text-left px-4 py-2 font-semibold border-b border-gray-700">IP Address</th>
            <td className="px-4 py-2 border-b border-gray-700">{ip}</td>
          </tr>
          <tr>
            <th className="text-left px-4 py-2 font-semibold border-b border-gray-700">Bogon</th>
            <td className="px-4 py-2 border-b border-gray-700">{mapData.get("bogon") ? "true" : "false"}</td>
          </tr>
          <tr>
            <th className="text-left px-4 py-2 font-semibold border-b border-gray-700">City</th>
            <td className="px-4 py-2 border-b border-gray-700">{mapData.get("city")}</td>
          </tr>
          <tr>
            <th className="text-left px-4 py-2 font-semibold border-b border-gray-700">Region</th>
            <td className="px-4 py-2 border-b border-gray-700">{mapData.get("region")}</td>
          </tr>
          <tr>
            <th className="text-left px-4 py-2 font-semibold border-b border-gray-700">Country</th>
            <td className="px-4 py-2 border-b border-gray-700">{mapData.get("country")}</td>
          </tr>
          <tr>
            <th className="text-left px-4 py-2 font-semibold border-b border-gray-700">Latitude</th>
            <td className="px-4 py-2 border-b border-gray-700">{mapData.get("latitude")}</td>
          </tr>
          <tr>
            <th className="text-left px-4 py-2 font-semibold">Longitude</th>
            <td className="px-4 py-2">{mapData.get("longitude")}</td>
          </tr>
        </tbody>
      </table>

      {/* Map */}
      <div id="map" className="md:w-3/4 rounded shadow border border-gray-700" style={{ height: "300px" }}></div>
    </div>
  </main>
);
;}
// ...existing code...}
};

export default IPInfo;