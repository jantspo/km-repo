const paginate = require('../helpers/paginate');
const Asset = require('../models/index').asset;
const KMListing = require('../models/index').km_listing;
const KMFiles = require('../models/index').km_file;
const AssetDetails = require('../models/index').asset_detail;
const Document = require('../models/index').document;
const PropertyType = require('../models/index').property_type;
const Images = require('../models/index').image;
const ImageFolders = require('../models/index').image_folder;
const userFavorites = require('../models/index').km_user_favorite;
const Sequelize = require('sequelize');

const Op = Sequelize.Op
const any = Op.any;

const AssetController = {
    findOne: (id) => {
        return Asset.findOne({
            where: {id: id},
            include: [
                {
                    model: KMListing,
                    as: "km_listing"
                },
                {
                    model: AssetDetails,
                    include: [
                        {
                            model: PropertyType,
                            as: 'property_type',
                        }
                    ]
                },
                
            ]
        });
    },

    findAll: (params) => {
        const {page, pageSize} = params;
        const order = [];
        const query = {
            [Op.and] : {
                km_listed: true
            }
        };

        const salesQuery = { 
            [Op.and]: {
                list_price: {[Op.gte]: 0},
                arv: {[Op.gte]: 0},
                total_cost: {[Op.gte]: 0},
            },
        };
        
        let detailQuery = {
            [Op.and]: {
                beds: {[Op.gte]: 0},
                baths: {[Op.gte]: 0},
                sq_ft: {[Op.gte]: 0}
            }
        };

        if(params.state) query[Op.and].state = params.state;
        if(params.cities && params.cities.length > 0) query[Op.and].city = {[Op.any]: params.cities};
        if(params.beds) detailQuery[Op.and].beds[Op.gte] = parseFloat(params.beds);
        if(params.baths) detailQuery[Op.and].baths[Op.gte] =parseFloat(params.baths);
        if(params.sq_ft) detailQuery[Op.and].sq_ft[Op.gte] =parseFloat(params.sq_ft);
        // console.log(params.propertyTypes);
        // if(params.propertyTypes && params.propertyTypes.length > 0) detailQuery[Op.and].property_type_id = {[Op.any]: params.propertyTypes};
        // console.log(detailQuery[Op.and]);
        // console.log(detailQuery[Op.and].property_type_id);
        if(params.minPrice) salesQuery[Op.and].list_price[Op.gte] = parseInt(params.minPrice);
        if(params.maxPrice) salesQuery[Op.and].list_price[Op.lte] = parseInt(params.maxPrice);
        if(params.minARV) salesQuery[Op.and].arv[Op.gte] = parseInt(params.minARV);
        if(params.maxARV) salesQuery[Op.and].arv[Op.lte] = parseInt(params.maxARV);
        if(params.minInvest) salesQuery[Op.and].total_cost[Op.gte] = parseInt(params.minInvest);
        if(params.maxInvest) salesQuery[Op.and].total_cost[Op.lte] = parseInt(params.maxInvest);

        if(params.order) order.push([{model: KMListing, as: 'km_listing'},params.order.by, params.order.dir]);
        else order.push([{model: KMListing, as: 'km_listing'},'createdAt', 'ASC']);

        const includes = [
            {
                model: KMListing,
                as: "km_listing",
                where: salesQuery
            },
            {
                model: AssetDetails,
                attributes: ['sq_ft', 'beds', 'baths', 'property_type_id'],
                include: [
                    {
                        model: PropertyType,
                        as: 'property_type',
                    }
                ],
                where: detailQuery
            },
           
        ];

        if(params.userId){
            includes.push( { 
                model: userFavorites, 
                where: { user_id: params.userId }, 
                as: 'favorite',
                required: false 
            });
        }

        return  Asset.findAll({
            where: query,
            include: includes,
            order: order
        }).then((result) => {
            let properties = JSON.parse(JSON.stringify(result));
            if(params.propertyTypes && params.propertyTypes.length > 0){
                properties = properties.filter(prop => {
                    console.log(prop.asset_detail);
                    return params.propertyTypes.includes(prop.asset_detail.property_type_id)
                })
            }
            const chunkArrayInGroups = (arr, size) => {
                var myArray = [];
                for(var i = 0; i < arr.length; i += size) {
                  myArray.push(arr.slice(i, i+size));
                }
                return myArray;
            },

            chunkedArray = chunkArrayInGroups(properties, pageSize);
            return chunkedArray.length > 0 ? chunkedArray[page - 1] : [];
        });
    },

    chunkArrayInGroups: (arr, size) => {
        var myArray = [];
        for(var i = 0; i < arr.length; i += size) {
          myArray.push(arr.slice(i, i+size));
        }
        return myArray;
    },

    getAssetCount: (params) => {
        const query = {
            [Op.and] : {
                km_listed: true
            }
        };

        const salesQuery = { 
            [Op.and]: {
                list_price: {[Op.gte]: 0},
                arv: {[Op.gte]: 0},
                total_cost: {[Op.gte]: 0},
            },
        };
        

        let detailQuery = {
            [Op.and]: {
                beds: {[Op.gte]: 0},
                baths: {[Op.gte]: 0},
                sq_ft: {[Op.gte]: 0}
            }
        };

        if(params.state) query[Op.and].state = params.state;
        if(params.city) query[Op.and].city = {[Op.any]: params.cities};
        if(params.beds) detailQuery[Op.and].beds[Op.gte] = parseFloat(params.beds);
        if(params.baths) detailQuery[Op.and].baths[Op.gte] =parseFloat(params.baths);
        if(params.sq_ft) detailQuery[Op.and].sq_ft[Op.gte] =parseFloat(params.sq_ft);
        if(params.sq_ft) detailQuery[Op.and].property_type_id[Op.any] = params.propertyTypes;

        if(params.minPrice) salesQuery[Op.and].list_price[Op.gte] = parseInt(params.minPrice);
        if(params.maxPrice) salesQuery[Op.and].list_price[Op.lte] = parseInt(params.maxPrice);
        if(params.minARV) salesQuery[Op.and].arv[Op.gte] = parseInt(params.minARV);
        if(params.maxARV) salesQuery[Op.and].arv[Op.lte] = parseInt(params.maxARV);
        if(params.minInvest) salesQuery[Op.and].total_cost[Op.gte] = parseInt(params.minInvest);
        if(params.maxInvest) salesQuery[Op.and].total_cost[Op.lte] = parseInt(params.maxInvest);

        return Asset.count({
            where: query,
            include: [
                {
                    model: KMListing,
                    as: "km_listing",
                    where: salesQuery
                },
                {
                    model: AssetDetails,
                    attributes: ['sq_ft', 'beds', 'baths'],
                    include: [
                        {
                            model: PropertyType,
                            as: 'property_type',
                        }
                    ],
                    where: detailQuery
                }
            ]
        });
    },

    getImages: (id) => {
        return ImageFolders.findOne({
            where: {
                asset_id: id,
                name: 'KM Public'
            },
            include: [
                {
                    model: Images
                }
            ]
        })
    },

    getFiles: (id) => {
        console.log(id);
        return KMFiles.findAll({
            where: {
                listing_id: id
            },
            include: [
                {
                    model: Document,
                    as: 'document'
                }
            ]
        })
    },

    getUserFavorites: (params) => {
        const {page, pageSize} = params;
        const order = [];
        const query = {
            [Op.and] : {
                km_listed: true
            }
        };

        const salesQuery = { 
            [Op.and]: {
                list_price: {[Op.gte]: 0},
                arv: {[Op.gte]: 0},
                total_cost: {[Op.gte]: 0},
            },
        };
        
        let detailQuery = {
            [Op.and]: {
                beds: {[Op.gte]: 0},
                baths: {[Op.gte]: 0},
                sq_ft: {[Op.gte]: 0}
            }
        };

        if(params.state) query[Op.and].state = params.state;
        if(params.cities && params.cities.length > 0) query[Op.and].city = {[Op.any]: params.cities};
        if(params.beds) detailQuery[Op.and].beds[Op.gte] = parseFloat(params.beds);
        if(params.baths) detailQuery[Op.and].baths[Op.gte] =parseFloat(params.baths);
        if(params.sq_ft) detailQuery[Op.and].sq_ft[Op.gte] =parseFloat(params.sq_ft);
        // console.log(params.propertyTypes);
        // if(params.propertyTypes && params.propertyTypes.length > 0) detailQuery[Op.and].property_type_id = {[Op.any]: params.propertyTypes};
        // console.log(detailQuery[Op.and]);
        // console.log(detailQuery[Op.and].property_type_id);
        if(params.minPrice) salesQuery[Op.and].list_price[Op.gte] = parseInt(params.minPrice);
        if(params.maxPrice) salesQuery[Op.and].list_price[Op.lte] = parseInt(params.maxPrice);
        if(params.minARV) salesQuery[Op.and].arv[Op.gte] = parseInt(params.minARV);
        if(params.maxARV) salesQuery[Op.and].arv[Op.lte] = parseInt(params.maxARV);
        if(params.minInvest) salesQuery[Op.and].total_cost[Op.gte] = parseInt(params.minInvest);
        if(params.maxInvest) salesQuery[Op.and].total_cost[Op.lte] = parseInt(params.maxInvest);

        if(params.order) order.push([{model: KMListing, as: 'km_listing'},params.order.by, params.order.dir]);
        else order.push([{model: KMListing, as: 'km_listing'},'createdAt', 'ASC']);

        const includes = [
            {
                model: userFavorites,
                where: {
                    user_id: params.user_id
                },
                as: 'favorite'
            },
            {
                model: KMListing,
                as: "km_listing",
                where: salesQuery
            },
            {
                model: AssetDetails,
                attributes: ['sq_ft', 'beds', 'baths', 'property_type_id'],
                include: [
                    {
                        model: PropertyType,
                        as: 'property_type',
                    }
                ],
                where: detailQuery
            },
           
        ];

        return  Asset.findAll({
            where: query,
            include: includes,
            order: order
        }).then((result) => {
            let properties = JSON.parse(JSON.stringify(result));
            if(params.propertyTypes && params.propertyTypes.length > 0){
                properties = properties.filter(prop => {
                    console.log(prop.asset_detail);
                    return params.propertyTypes.includes(prop.asset_detail.property_type_id)
                })
            }
            const chunkArrayInGroups = (arr, size) => {
                var myArray = [];
                for(var i = 0; i < arr.length; i += size) {
                  myArray.push(arr.slice(i, i+size));
                }
                return myArray;
            },

            chunkedArray = chunkArrayInGroups(properties, pageSize);
            return chunkedArray.length > 0 ? chunkedArray[page - 1] : [];
        });
    }
};

module.exports = AssetController;