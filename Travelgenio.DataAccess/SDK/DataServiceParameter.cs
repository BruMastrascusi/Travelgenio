using System;
 

namespace Travelgenio.DataAccess.SDK
{
    public class DataServiceParameter
    {
        public string Name { get; set; }
        public Object Value { get; set; }

        public DataServiceParameter(string name, Object value)
        {
            this.Name = name;
            if(value ==null)
                this.Value = DBNull.Value;
            else
            {
                this.Value = value;
            }

        }
        public static DataServiceParameter Create(string name, Object value) {
            return new DataServiceParameter(name, value);
        }


    }
}
