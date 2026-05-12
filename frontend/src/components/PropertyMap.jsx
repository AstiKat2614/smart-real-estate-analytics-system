import React from 'react';

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet';

const PropertyMap = () => {

    const properties = [
    {
        name: 'Whitefield',
        position: [12.9698, 77.7500],
        price: '₹82,00,000'
    },
    {
        name: 'Indiranagar',
        position: [12.9784, 77.6408],
        price: '₹1,45,00,000'
    },
    {
        name: 'Electronic City',
        position: [12.8456, 77.6603],
        price: '₹67,00,000'
    },
    {
        name: 'Koramangala',
        position: [12.9352, 77.6245],
        price: '₹1,20,00,000'
    }
];

    return (
        <div
            style={{
                marginTop: '30px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 0 20px #ff1493'
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    marginBottom: '10px'
                }}
            >
                PROPERTY LOCATION ANALYTICS
            </h2>

            <MapContainer
                center={[12.9716, 77.5946]}
                zoom={11}
                style={{
                    height: '400px',
                    width: '100%'
                }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {properties.map((property, index) => (
                    <Marker
                        key={index}
                        position={property.position}
                    >
                        <Popup>
                            <strong>{property.name}</strong>
                            <br />
                            Estimated Price: {property.price}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default PropertyMap;