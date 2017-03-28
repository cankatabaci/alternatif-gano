using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trans
{
    class Calc
    {
        public double dersNotHesapla(int AKTS, string harfNotu)
        {
            string harfNot = harfNotu;
            double gercekNot;
            double dersYano = 0;
            int akts = AKTS;

            switch(harfNot)
            {
                case "AA":
                    gercekNot = 4;
                    break;
                case "BA":
                    gercekNot = 3.5;
                    break;
                case "BB":
                    gercekNot = 3;
                    break;
                case "CB":
                    gercekNot = 2.5;
                    break;
                case "CC":
                    gercekNot = 2;
                    break;
                case "DC":
                    gercekNot = 1.5;
                    break;
                case "DD":
                    gercekNot = 1;
                    break;
                case "FD":
                    gercekNot = 0.5;
                    break;
                case "FF":
                    gercekNot = 0;
                    break;
                default:
                    gercekNot = -1;
                    break;
            }

            dersYano = (akts * gercekNot) / akts;

            return dersYano;
        }

        public double yanoHesapla(Ders[] dizi)
        {
            double YANO = 0;
            int dersSayisi = dizi.Length;
            for(int i=0;i<dersSayisi; i++)
                YANO += dersNotHesapla(dizi[i].AKTS, dizi[i].harfNotu);

            YANO = YANO / dersSayisi;
            return YANO;
        }

        public double ganoHesapla(Yariyil[] y)
        {
            double GANO = 0;
            int donemSayisi = y.Length;

            for(int i=0;i<donemSayisi;i++)
            {
                for(int x=0;x<y[i].Dersler.Length; x++)
                {
                    GANO += yanoHesapla(y[i].Dersler);
                }
            }

            GANO = GANO / donemSayisi;
            return GANO;
        }

    }
}
