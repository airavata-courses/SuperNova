import base64
import io
import os
from os.path import exists
from warnings import filterwarnings

import matplotlib
import numpy
import numpy as np
from matplotlib import pyplot as plt

matplotlib.use('Agg')
import xarray
from mpl_toolkits.basemap import Basemap
import imageio
import pandas as pd
import requests

filterwarnings("ignore", category=DeprecationWarning)
filterwarnings("ignore", category=FutureWarning)
filterwarnings("ignore", category=UserWarning)
filterwarnings("ignore", category=RuntimeWarning)
import netCDF4


# def plot_reflectivity(radar_id, month, day, year):
#     try:
#         # Connecting this for testing and adding static image path.
#         plot_path = './output/iron-man-fly.gif'
#         # plot_path = './output/{0}-{1}-{2}-{3}.gif'.format(radar_id, year, month, day)
#         if not exists(plot_path):
#             templocation = tempfile.mkdtemp()
#             conn = nexradaws.NexradAwsInterface()
#             central_timezone = pytz.timezone('US/Central')
#             start = central_timezone.localize(datetime(year, month, day, 17, 0))
#             end = central_timezone.localize(datetime(year, month, day, 19, 0))
#             scans = conn.get_avail_scans_in_range(start, end, radar_id)
#             print("Meera Api:plot_reflectivity - There are {} scans available between {} and {}\n".format(len(scans), start, end))
#
#             max_scan = 5 if len(scans) >= 5 else len(scans)
#             results = conn.download(scans[0: max_scan], templocation)
#
#             frames = []
#             for i, scan in enumerate(results.iter_success(), start=1):
#                 fig = plt.figure(figsize=(4, 4))
#                 # ax = fig.add_subplot(2, 2, i)
#                 radar = scan.open_pyart()
#                 display = pyart.graph.RadarDisplay(radar)
#                 display.plot('reflectivity', 0)
#                 # plt.axis('off')
#                 # display.set_limits((-150, 150), (-150, 150), ax=ax)
#                 # plt.savefig(f'{str(scan.radar_id)+ str(scan.scan_time)}.png', dpi=300, facecolor='w', edgecolor='w')
#                 bytes_image = io.BytesIO()
#                 plt.savefig(bytes_image, format='png')
#                 bytes_image.seek(0)
#                 frames.append(Image.open(bytes_image))
#
#             # Save into a GIF file that loops forever
#
#             frames[0].save(plot_path,
#                            format='GIF',
#                            append_images=frames[1:],
#                            save_all=True,
#                            duration=400, loop=0)
#
#         if exists(plot_path):
#             print('Meera Api:plot_reflectivity - Safety Net: Plot exists')
#         with open(plot_path, "rb") as image_file:
#             base64PlotData = base64.b64encode(image_file.read())
#         return base64PlotData
#     except Exception as e:
#         print("Meera Api:plot_reflectivity - Exception:", e)
#     return None

def plot_merra(radar_id, month, day, year):
    # try:
    print('Started Plotting')
    plot_path = './output/{0}-{1}-{2}-{3}.gif'.format(radar_id, year, month, day)
    if not exists(plot_path):
        fetch_file = fetchdata(month, day, year)
        # 'MERRA2_400.tavg1_2d_slv_Nx.20220201.nc4'
        xds = xarray.open_dataset(fetch_file)
        # print("FILE_NAME"+fetch_file)
        pr = xds['TO3']
        lons, lats = np.meshgrid(pr['lon'].data, pr['lat'].data)

        lonscsv = './geo/{0}-{1}-{2}-{3}-lons.csv'.format(radar_id, year, month, day)
        latscsv = './geo/{0}-{1}-{2}-{3}-lats.csv'.format(radar_id, year, month, day)
        numpy.savetxt(lonscsv, lons, delimiter=",")
        numpy.savetxt(latscsv, lats, delimiter=",")

        filenames = []
        lons = pd.read_csv(lonscsv, sep=',', header=None).values
        lats = pd.read_csv(latscsv, sep=',', header=None).values

        foldercsv = './csv/{0}-{1}-{2}-{3}-'.format(radar_id, year, month, day)
        for i in range(0, 24):
            numpy.savetxt(foldercsv + str(i) + ".csv", pr.sel(time=pr['time'][i]).data, delimiter=",")
        timelen = len(pr['time'])
        frames = []
        for i in range(timelen):
            data = pd.read_csv(foldercsv + str(i) + ".csv", sep=',', header=None).values
            figure = plt.figure(figsize=(17, 12))
            Map_Plot = Basemap(projection='cyl', lon_0=0, resolution='c')
            Map_Plot.drawcountries()

            TEMP_FUNC = Map_Plot.contourf(lons, lats, data, cmap="hot")
            Map_Plot.fillcontinents(color='green', lake_color='aqua')
            COLOR_BAR_FUNC = Map_Plot.colorbar(TEMP_FUNC, "bottom", size="5%", pad="2%")
            COLOR_BAR_FUNC.set_label('Dobsons')
            plt.title("TOTAL COLUMN OZONE", fontsize=18)
            pngfilename = './dump/{0}-{1}-{2}-{3}-'.format(radar_id, year, month, day)
            filename = pngfilename + str(i) + '.png'
            filenames.append(filename)
            plt.savefig(filename)

        with imageio.get_writer(plot_path, mode='I') as writer:
            for filename in filenames:
                image = imageio.imread(filename)
                writer.append_data(image)

        # for filename in set(filenames):
        #     os.remove(filename)

        # remove nasa file
        # os.remove(fetch_file)

    if exists(plot_path):
        print('Meera Api:plot_merra - Safety Net: Plot exists')
        with open(plot_path, "rb") as image_file:
            base64PlotData = base64.b64encode(image_file.read())
        return base64PlotData
    # except Exception as e:
    #     print("Meera Api:plot_merra - Exception:", e)
    return None


def fetchdata(month, day, year):

    print("Fetching data...")
    # 'MERRA2_400.tavg1_2d_slv_Nx.20220201.nc4'
    # domain = "https://goldsmr4.gesdisc.eosdis.nasa.gov/data/MERRA2/M2I1NXLFO.5.12.4/"
    domain = 'https://goldsmr4.gesdisc.eosdis.nasa.gov/data/MERRA2/M2T1NXSLV.5.12.4/'
    # year = getValue["year"]
    # month = str(getValue["month"]).zfill(2)
    # day = str(getValue["day"]).zfill(2)

    subdomain = year + "/" + month + "/" + "MERRA2_400.tavg1_2d_slv_Nx." + year + month + day + ".nc4"

    URL = domain + subdomain
    print('URL'+ URL)
    FILENAME = "./data/"+year + "-" + month + "-" + day + ".nc4"
    # try:
    result = requests.get(URL)
    print(result.status_code, type(result.status_code))

    if result.status_code != 200:
        print("Merra Data not downloaded")
        return None


        # file_size = int(result.headers['Content-Length'])
        # chunk = 1
        # chunk_size = 1024
        # num_bars = int(file_size / chunk_size)

        # print(dict(file_size=file_size))
        # print(dict(num_bars=num_bars))

        # progress_bar = tqdm(total=file_size, unit='KB', unit_scale=True)
        # with open(FILENAME, 'wb') as fp:
        #     for chunk in tqdm.tqdm(
        #             result.iter_content(chunk_size=chunk_size)
        #             , total=num_bars
        #             , unit='KB'
        #             , desc=FILENAME
        #             , leave=True  # progressbar stays
        #     ):
        #         progress_bar.update(len(chunk))
        #         fp.write(chunk)
        # progress_bar.close()
        result.raise_for_status()
        f = open(FILENAME, 'wb')
        f.write(result.content)
        f.close()
        print('contents of URL written to ' + str(FILENAME))
    # except Exception as e:
    #     print('requests.get() returned an error code '+ str(e))

    return FILENAME


# plot_merra('T', '01', '21', '2022')
