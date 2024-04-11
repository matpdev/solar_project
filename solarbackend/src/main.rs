mod model;
mod routes;
mod handlers;

use std::error;

use warp::Filter;

use crate::{ handlers::*, routes::* };

#[tokio::main]
async fn main() {
    let routes = get_structures().or(get_structures_random()).with(warp::cors().allow_any_origin());

    println!("Server started at: http://localhost:8000");
    warp::serve(routes).run(([127, 0, 0, 1], 8000)).await
}
