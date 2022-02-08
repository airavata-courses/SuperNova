from starlette.requests import Request
from starlette.responses import Response

import weatherApi as weatherApi
from fastapi import FastAPI, HTTPException
import uvicorn
from fastapi.responses import FileResponse
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
import plotting

app = FastAPI()

origins = ["*"]

middleware = [Middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )
]

app = FastAPI(middleware=middleware)


async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception:
        return Response("Internal server error", status_code=505)


app.middleware('http')(catch_exceptions_middleware)


@app.get("/weatherApi/plot")
async def read_root(radar_id, date):
    print('radar_id:{0}, date:{1}'.format(radar_id, date))
    report_date = date.split('-')
    plot_file = plotting.plot_reflectivity(radar_id, int(report_date[0]), int(report_date[1]), int(report_date[2]))
    if plot_file:
        return plot_file
    else:
        raise HTTPException(status_code=404, detail="Item not found")


def setup():
    print('welcome to weather radar api')
    uvicorn.run(app, host="0.0.0.0", port=4600)



if __name__ == '__main__':
    weatherApi.setup()

## Run via docker

# ```
# docker build --build-arg run_env=dev . -t weatherradar:test
# docker run -e PORT=8000 -p 8000:8000 weatherradar:test
# ```
