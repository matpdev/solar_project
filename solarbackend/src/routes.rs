use warp::Filter;
use super::handlers;

pub fn get_structures() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> +
    Clone {
    warp::path::end().and(warp::get()).and_then(handlers::get_all_structures)
}

pub fn get_structures_random() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> +
    Clone {
    warp::path("random").and(warp::get()).and_then(handlers::get_all_structures_random)
}
