const goole_key= "";

export const getMapPreview = (lat,lng)=>{
    const imageURl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
    &markers=color:black%7Clabel:S%7C${lat},${lng}
    &key=${goole_key}`;

    return imageURl;
}

export const getAddress = async(lat, lng) =>{

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${goole_key}`;
    const response = await fetch(url);
    if(!response.ok) throw new Error(" Failed to fetch address");
    const data= await response.json();
    const address = data.results[0].formatted_address;
    return address;
}