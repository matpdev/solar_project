use warp::Filter;
use rand::Rng;
use names::Generator;
use crate::model::StructureLength;

use super::model::Structure;

pub async fn get_all_structures_random() -> Result<impl warp::Reply, warp::Rejection> {
    let mut structures: Vec<Structure> = Vec::new();
    let mut rng = rand::thread_rng();
    let mut generator = Generator::default();

    for structure in 0..100 {
        let val = rng.gen_range(-33.0..4.0);
        let val2 = rng.gen_range(-75.0..-35.0);

        let height = rng.gen_range(1..50);
        let width = rng.gen_range(1..50);

        structures.push(Structure {
            id: structure + 1,
            name: String::from(generator.next().unwrap()),
            description: String::from(generator.next().unwrap()),
            lat: val,
            lng: val2,
            struct_length: StructureLength {
                height: height,
                square_size: width * height,
                width: width,
            },
        });
    }

    Ok(warp::reply::json(&structures))
}
pub async fn get_all_structures() -> Result<impl warp::Reply, warp::Rejection> {
    let structures = [
        Structure {
            id: 1,
            name: String::from("Palo Alto Center"),
            description: String::from("795 El Camino Real, Palo Alto, CA 94301, Estados Unidos"),
            lat: 37.4440222,
            lng: -122.13891330000001,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        Structure {
            id: 2,
            name: String::from("Rinconada Library"),
            description: String::from("1213 Newell Rd, Palo Alto, CA 94303, Estados Unidos"),
            lat: 37.44494929292734,
            lng: -122.13925486976473,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        Structure {
            id: 3,
            name: String::from("Lucie Stern Community Center"),
            description: String::from("1305 Middlefield Rd, Palo Alto, CA 94301, Estados Unidos"),
            lat: 37.44428832626343,
            lng: -122.14560344634529,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        Structure {
            id: 4,
            name: String::from("el PRADO Hotel"),
            description: String::from("520 Cowper St, Palo Alto, CA 94301, Estados Unidos"),
            lat: 37.447780227805055,
            lng: -122.15906384737605,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        /* 49.22884623897037, -123.15192181887204 */
        Structure {
            id: 4,
            name: String::from("Maple Grove Elementary School"),
            description: String::from("1924 W 45th Ave, Vancouver, BC V6M 3S3, Canadá"),
            lat: 49.230238614545925,
            lng: -123.15057479783879,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        Structure {
            id: 4,
            name: String::from("Magee Secondary School"),
            description: String::from("6360 Maple St, Vancouver, BC V6M 4M2, Canadá"),
            lat: 49.22884623897037,
            lng: -123.15192181887204,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        // 49.2437145585588, -123.18594068446295
        Structure {
            id: 4,
            name: String::from("Dunbar Community Centre"),
            description: String::from("4747 Dunbar St, Vancouver, BC V6S 2H2, Canadá"),
            lat: 49.2437145585588,
            lng: -123.18594068446295,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        // 49.25764081723103, -123.14240883120208
        Structure {
            id: 4,
            name: String::from("Vancouver Lawn Tennis & Badminton Club"),
            description: String::from("1630 W 15th Ave, Vancouver, BC V6J 2K7, Canadá"),
            lat: 49.25764081723103,
            lng: -123.14240883120208,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
        /* -5.800679461020519, -35.21531137091306 */
        Structure {
            id: 4,
            name: String::from("Nordestão Alecrim"),
            description: String::from("Av. Pres. Bandeira, 717 - Alecrim, Natal - RN, 59032-201"),
            lat: -5.800679461020519,
            lng: -35.21531137091306,
            struct_length: StructureLength {
                height: 4,
                square_size: 16,
                width: 4,
            },
        },
    ];

    Ok(warp::reply::json(&structures))
}
