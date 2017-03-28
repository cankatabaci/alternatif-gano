using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace trans
{
    public class Ders
    {
        public int dersKodu { get; set; }
        public string dersAdi { get; set; }
        public int AKTS { get; set; }
        public string harfNotu { get; set; }
        public int yariyil { get; set; }

        public Ders()
        {
            this.AKTS = AKTS;
            this.dersAdi = dersAdi;
            this.dersKodu = dersKodu;
            this.harfNotu = harfNotu;
        }
    }
}
