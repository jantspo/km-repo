const paginate = require('../helpers/paginate');
const Asset = require('../models/index').asset;
const SalesInfo = require('../models/index').sales_info;
const AssetDetails = require('../models/index').asset_detail;
const AssetStyle = require('../models/index').asset_style;
const AssetType = require('../models/index').asset_type;
const BasementType = require('../models/index').basement_type;
const PropertyType = require('../models/index').property_type;
const ViewType = require('../models/index').view_type;
const WaterfrontType = require('../models/index').waterfront_type;
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const any = Op.any;
const AssetController = {
    findAll: (params) => {
        const {page, pageSize} = params;
        const query = {
            km_listed: true
        };

        const salesQuery = { 
            [Op.and]: {
                km_sell_price: {[Op.gte]: 0},
                km_arv: {[Op.gte]: 0}
            },
        };

        if(params.state) query.state = params.state;
        if(params.minPrice) salesQuery[Op.and].km_sell_price[Op.gte] = parseInt(params.minPrice);
        if(params.maxPrice) salesQuery[Op.and].km_sell_price[Op.lte] = parseInt(params.maxPrice);
        if(params.minARV) salesQuery[Op.and].km_arv[Op.gte] = parseInt(params.minARV);
        if(params.maxARV) salesQuery[Op.and].km_arv[Op.lte] = parseInt(params.maxARV);

        return  Asset.findAll({
            where: query,
            include: [
                {
                    model: SalesInfo,
                    as: "sales_info",
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
                    ]
                }
            ]
        }).then((result) => {
            if(params.propertyTypes && params.propertyTypes.length > 0){
                result = result.filter(prop => {
                    return params.propertyTypes.includes(prop.asset_detail.property_type.id)
                })
            }
            // if(params.maxPrice){
            //     result = result.filter(prop => {
            //         return parseInt(prop.sales_info.km_sell_price) < parseInt(params.maxPrice) 
            //     })
            // }
            // if(params.minPrice){
            //     result = result.filter(prop => {
            //         return parseInt(prop.sales_info.km_sell_price) > parseInt(params.minPrice) 
            //     })
            // }
            // if(params.maxARV){
            //     result = result.filter(prop => {
            //         return parseInt(prop.sales_info.km_arv) < parseInt(params.maxARV) 
            //     })
            // }
            // if(params.minARV){
            //     result = result.filter(prop => {
            //         return parseInt(prop.sales_info.km_arv) > parseInt(params.minARV) 
            //     })
            // }
            const chunkArrayInGroups = (arr, size) => {
                var myArray = [];
                for(var i = 0; i < arr.length; i += size) {
                  myArray.push(arr.slice(i, i+size));
                }
                return myArray;
            },

            chunkedArray = chunkArrayInGroups(result, pageSize);
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
            km_listed: true
        };

        return Asset.count({
            where: query,
            include: [
                {
                    model: SalesInfo,
                    // where: salesQuery,
                    as: "sales_info"
                },
                {
                    model: AssetDetails,
                    attributes: ['sq_ft', 'beds', 'baths'],
                    include: [
                        {
                            model: AssetStyle,
                            as: 'asset_style'
                        },
                        {
                            model: PropertyType,
                            as: 'property_type'
                        }
                    ]
                }
            ]
        });
    }
};

module.exports = AssetController;