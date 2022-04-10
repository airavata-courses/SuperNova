import base64
import io
import os
import traceback
from os.path import exists
from warnings import filterwarnings

import matplotlib
import numpy
import numpy as np
from PIL import Image
from matplotlib import pyplot as plt

matplotlib.use('Agg')
import xarray
from mpl_toolkits.basemap import Basemap
import pandas as pd
import requests
import shutil
from tqdm.auto import tqdm
filterwarnings("ignore", category=DeprecationWarning)
filterwarnings("ignore", category=FutureWarning)
filterwarnings("ignore", category=UserWarning)
filterwarnings("ignore", category=RuntimeWarning)

def plot_merra(radar_id, month, day, year):
    try:
        print('Started Plotting')
        plot_path = './output/{0}-{1}-{2}-{3}.gif'.format(radar_id, year, month, day)
        # return plot_path
        if not exists(plot_path):
            fetch_file = fetchdata(month, day, year)
            if fetch_file == None: return None
            # 'MERRA2_400.tavg1_2d_slv_Nx.20220201.nc4'
            print("FILE_NAME: " + fetch_file)
            xds = xarray.open_dataset(fetch_file)
            pr = xds['TO3']
            lons, lats = np.meshgrid(pr['lon'].data, pr['lat'].data)
            lonscsv = './geo/{0}-{1}-{2}-{3}-lons.csv'.format(radar_id, year, month, day)
            latscsv = './geo/{0}-{1}-{2}-{3}-lats.csv'.format(radar_id, year, month, day)
            numpy.savetxt(lonscsv, lons, delimiter=",")
            numpy.savetxt(latscsv, lats, delimiter=",")

            lons = pd.read_csv(lonscsv, sep=',', header=None).values
            lats = pd.read_csv(latscsv, sep=',', header=None).values

            foldernpz = './npz/{0}-{1}-{2}-{3}'.format(radar_id, year, month, day)
            timelen = len(pr['time'])//2

            numpy.savez_compressed(foldernpz, pr.sel(time=pr['time']).data, delimiter=",")


            frames = []
            for i in range(timelen):
                data = pr.sel(time=pr['time'][i]).data #pd.read_csv(foldercsv + str(i) + ".npz", sep=',', header=None).values
                figure = plt.figure(figsize=(4, 4))
                Map_Plot = Basemap(projection='cyl', lon_0=0, resolution='c')
                Map_Plot.drawcountries()

                TEMP_FUNC = Map_Plot.contourf(lons, lats, data, cmap="hot")
                Map_Plot.fillcontinents(color='green', lake_color='aqua')
                COLOR_BAR_FUNC = Map_Plot.colorbar(TEMP_FUNC, "bottom", size="5%", pad="2%")
                COLOR_BAR_FUNC.set_label('Dobsons')
                plt.title("TOTAL COLUMN OZONE", fontsize=10)
                bytes_image = io.BytesIO()
                plt.savefig(bytes_image, format='png')
                bytes_image.seek(0)
                frames.append(Image.open(bytes_image))

            frames[0].save(plot_path,
                           format='GIF',
                           append_images=frames[1:],
                           save_all=True,
                           duration=400, loop=0)

            # remove downloaded file
            os.remove(fetch_file)

        else:
            print('Meera Api:plot_merra - Safety Net: Plot exists')

        if exists(plot_path):
            with open(plot_path, "rb") as image_file:
                base64PlotData = base64.b64encode(image_file.read())
            return base64PlotData
    except Exception as e:
        print("Meera Api:plot_merra - Exception:", e)
        traceback.print_exc()
    return None


def fetchdata(month, day, year):
    print("Fetching data...")
    domain = 'https://goldsmr4.gesdisc.eosdis.nasa.gov/data/MERRA2/M2T1NXSLV.5.12.4/'
    subdomain = year + "/" + month + "/" + "MERRA2_400.tavg1_2d_slv_Nx." + year + month + day + ".nc4"
    URL = domain + subdomain
    print('URL: '+ URL)
    FILENAME = "./data/"+year + "-" + month + "-" + day + ".nc4"
    try:
        if not exists(FILENAME):
            print('Data File Not Exist:',FILENAME)
            with requests.get(
                    "https://goldsmr4.gesdisc.eosdis.nasa.gov/data/MERRA2/M2T1NXSLV.5.12.4/2022/01/MERRA2_400.tavg1_2d_slv_Nx.20220101.nc4",
                    stream=True) as result:
                if result.status_code != 200: 
                    print("Downloading merra data failed",result.status_code)
                    return None
                total_length = int(result.headers.get("Content-Length"))

                with tqdm.wrapattr(result.raw, "read", total=total_length, desc="") as raw:
                    with open(FILENAME, 'wb') as output:
                        shutil.copyfileobj(raw, output)

                print('contents of URL written to ' + str(FILENAME))
        else:
            print('Data File Exist:', FILENAME)
    except Exception as e:
        print('requests.get() returned an error code '+ str(e))

    return FILENAME


# plot_merra('T', '01', '21', '2022'c)
